import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";
import { User } from "../model/user.model.js"
import { response } from "express";

export const postPage = (request, response, next) => { }

export const getAllPost = (request, response, next) => {
    let page = parseInt(request.query.page) || 1;
    let perPage = 200;
    try {
        Post.find().populate('userId').sort({ _id: 1 }).skip((page - 1) * perPage).limit(perPage)
            .then((result) => {
                return response.status(200).json({ message: "data found", result: result.reverse(), status: true });
            });
    } catch (error) {
        return response.status(500).json({ error: "internal server error", status: true });
    }
}

export const uploadPost = async (request, response) => {
    let file = await (request.file) ? request.file.filename : null;
    if (!file)
        return response.status(400).json({ result: "bad request", status: false })
    request.body.file = file;
    try {
        request.body.isLiked = false;
        Post.create(request.body)
        return response.status(200).json({ message: "post uploaded by user ", status: true });
    } catch (err) {
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const getAllLikes = (request, response, next) => {
    Post.findById({ _id: request.body.postId })
        .populate("likeItems.friendUserId").then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json({ message: "internal server error", status: false })
        })
}

export const getSavedPost = (request, response, next) => {
    Post.findById({ _id: request.body.postId })
        .populate("saveItems.friendUserId").then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ message: "internal server error", status: false })
        })
}

export const getAllComments = (request, response, next) => {
    Comment.find({ userPostId: request.body.userPostId }).populate("friendUserId").then(result => {
        return response.status(200).json({ message: "data found", result: result, status: true })
    }).catch(err => {
        return response.status(500).json({ error: "internal server error", status: false });
    })




}

// export const likePost = async ({ body }, res) => {
//     const { postId, friendUserId } = body;

//     const postFound = await Post.findOneAndUpdate(
//       { _id: postId },
//       friendUserId ? { $pull: { likeItems: { friendUserId } } } : { $push: { likeItems: { friendUserId } } },
//       { new: true, select: "likeItems" }
//     ).lean() ?? { likeItems: [] };

//     const liked = postFound.likeItems.some(item => item.friendUserId === friendUserId);
//     const message = liked ? "you unliked the post" : "you liked the post";
//     res.status(200).json({ message, status: !liked });

//   };

export const likePost = async (request, response, next) => {
    try {
        let postFound = await Post.findOne({ _id: request.body.postId });
        if (postFound) {
            if (postFound.likeItems.some((item) => item.friendUserId == request.body.friendUserId)) {
                let index = postFound.likeItems.findIndex((user) => { return user.friendUserId == request.body.friendUserId });
                postFound.likeItems.splice(index, 1);
                await postFound.save();
                return response.status(200).json({ message: " you unliked the post", status: true })
            } else {
                postFound.likeItems.push({ friendUserId: request.body.friendUserId });
                await postFound.save();
                return response.status(200).json({ message: "like the post", status: true })
            }
        }
        else {
            await Post.create({ postId: request.body.postId, likeItems: [{ friendUserId: request.body.friendUserId }] });
        }
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const commentPost = async (request, response, next) => {
    try {
        let postFound = await Post.findOne({ _id: request.body.postId });
        postFound.commentItems.push({ friendUserId: request.body.friendUserId, comment: request.body.comment });
        await postFound.save();
        return response.status(200).json({ message: "comment successful", status: true })

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const getPostById = async (request, response) => {
    try {
        return response.status(200).json({ posts: await Post.find({ userId: await User.findById({ _id: request.body.userId }) }) });
    } catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}


{/* <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: '#4abdac' }}>
                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: 'white' }} >Updated Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="row">
                                <div className="col-md-4 mt-3 me-3">
                                    <img src="/img/user.png" style={{ height: '130px', width: '130px' }} />
                                    <button className=" btn btn-primary mt-3" style={{ width: "130px", backgroundColor: '#4abdac', border: 'none' }}>Edit Profile</button>

                                </div>
                                <div className="col-md-7">
                                    <input type="text" className="form-control mt-2" placeholder="Enter Name" />
                                    <input type="text" className="form-control mt-2" placeholder="Enter UserName" />
                                    <input type="text" className="form-control mt-2" placeholder="Enter Email" />
                                    <input type="text" className="form-control mt-2" placeholder="Enter Contact" />
                                    <form className="mt-2 "  >
                                        <input type="radio" value='male' name="gender" /> male &nbsp;&nbsp;&nbsp;
                                        <input type="radio" value='female' name="gender" /> female
                                    </form>

                                </div>
                            </div>
                            <div className="row mt-2">
                                <textarea placeholder="Add Address" className="form-control text1" style={{ width: '440px' }}  ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Link to='/update' data-bs-dismiss="modal" style={{ marginRight: '240px' }} ><button className="btn btn-link" style={{ color: '#4abdac' }}>Become a artist</button> </Link>
                        {/* <button  >Become a artist</button> */}
        //                 <button type="button" className="btn btn-primary" style={{ backgroundColor: '#4abdac', border: 'none' }}>Update</button>
        //             </div>
        //         </div>
        //     </div>
        // </div> */}