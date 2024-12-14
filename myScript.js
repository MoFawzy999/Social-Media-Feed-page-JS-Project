let activityContainer = document.querySelector(".activity-container");
activityContainer.innerHTML = `
                       <div class="activity-card">
                            <img src="images/posts/post4.png" alt="" class="user-img">
                            <p class="activity"><b>@siri999</b> liked your post</p>
                            <img src="images/posts/post1.png" alt="" class="activity-post">
                        </div>
                        <div class="activity-card">
                            <img src="images/user2.png" alt="" class="user-img">
                            <p class="activity"><b>@Michael888</b> liked your post</p>
                            <img src="images/posts/post1.png" alt="" class="activity-post">
                        </div>
                        <div class="activity-card">
                            <img src="images/user3.png" alt="" class="user-img">
                            <p class="activity"><b>@jackson888</b> liked your post</p>
                            <img src="images/posts/post1.png" alt="" class="activity-post">
                        </div>
                        <div class="activity-card">
                            <img src="images/user4.png" alt="" class="user-img">
                            <p class="activity"><b>@peter888</b> liked your post</p>
                            <img src="images/posts/post1.png" alt="" class="activity-post">
                        </div>`;
let heartIcon = document.querySelector(".heart-icon");
heartIcon.addEventListener("click", () => {
  activityContainer.classList.toggle("hide");
  heartIcon.classList.toggle("bxs-heart");
});

//============================================================================================
function likePost(post) {
  let likeBtn = post.querySelector(".like-icon");
  let likeImg = post.querySelector(".post-overlays");
  let likeCount = post.querySelector(".likes span");
  let shareWindow = post.querySelector(".share-window");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("bxs-heart");
    if(!likeBtn.classList.contains("bxs-heart")) {
      likeImg.classList.remove("show");
      likeCount.innerHTML = parseInt(likeCount.innerHTML) - 1 ;
    }else{
      likeImg.classList.add("show");
      setTimeout(() => {
        likeImg.classList.remove("show");
      }, 2000);
      likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1 ;
    }
    if (likeImg.classList.contains("show")) {
      shareWindow.classList.remove("active");
    }
  });
}
function sharePost(post) {
  let shareBtn = post.querySelector(".share-icon");
  let shareWindow = post.querySelector(".share-window");
  shareBtn.addEventListener("click", () => {
    shareWindow.classList.toggle("active");
  });
  let postLink = post.querySelector(".share-window .share-link-container input").placeholder;
  let copyBtn = post.querySelector(".share-window .share-link-container button");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(postLink).then(() => {
      shareBtn.click();
    });
  });
}
function addComment(post) {
  let commentInput = post.querySelector(".comment-box .comment-input");
  let addComment = post.querySelector(".comment-box .add-comment-btn");
  let commentsContainer = post.querySelector(".comments-container");
  let commentCount = post.querySelector(".comment-count span");
  addComment.addEventListener("click", () => {
    if (!commentInput.value) {
      return;
    }
    let comment = `<div class="comments">
             <img src="images/user1.png" alt="">
             <p class="comment-content">${commentInput.value}</p>
             <div>
             <i class="bx bx-heart like-comment"></i>
             <i class="bx bxs-trash-alt delete-comment"></i>
             </div>
            </div>
           `;
  let newNode = document.createElement("div");
  newNode.innerHTML = comment;
  commentsContainer.appendChild(newNode);
  commentCount.innerHTML = parseInt(commentCount.innerHTML) + 1;
  commentInput.value = "";
  removeComment(commentsContainer,commentCount);
  addLikeToComment(commentsContainer);
  });
}
function removeComment(commentsContainer, commentCount) {
  let commentDelete = commentsContainer.querySelectorAll(".delete-comment");
  commentDelete.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.currentTarget.parentElement.parentElement.remove();
      let comments = [...commentsContainer.querySelectorAll(".comments")];
      commentCount.innerHTML = comments.length ;
    });
  });
}
function addLikeToComment(commentsContainer) {
  let commentLike = commentsContainer.querySelectorAll(".like-comment");
  commentLike.forEach((like) => {
    like.onclick = function () {
      this.classList.toggle("bxs-heart");
      this.classList.toggle("red");
    };
  });
}

//posts settings in main section
function createPost(postDesc, imgUrl) {
  if (!imgUrl) {
    return `<div class="post">
    <div class="post-header">
    <img src="images/user1.png" alt="">
    <p class="username">@MoFawzy</p>
    </div>
    <div class="post-feed" style = "height : 100px">
       <div class="post-overlays">
          <img src="images/icon/red-heart.png" alt="">
       </div>
       <div class="share-window">
       <h1>Share the post with other</h1>
       <div class="share-link-container">
         <input type="text" placeholder="https://www.SocialApp.com/user/posts/45@cdr" disabled>
         <button>Copy</button>
        </div>
     </div>
     <div class="post-img-container" style="display:flex;align-items:center;justify-content:start;padding:10px;">
        <p class="post-desc">${postDesc}</p>
     </div>
     </div>
     <div class="post-details">
      <div class="details">
       <i class='bx bx-heart like-icon'></i>
       <i class='bx bx-share share-icon'></i>
       <span class="likes"><span>0</span> likes</span>
     </div>
       <div class="comments-container">
     </div>
     <div class="comment-box">
       <input type="text" placeholder="Add a comment" class="comment-input">
       <button class="add-comment-btn"><i class='bx bx-message-rounded-dots comment-icon'></i></button>
       <span class="comment-count"><span>0</span> comment</span>
     </div>
    </div>
   </div>`;
  } else {
    return `<div class="post">
    <div class="post-header">
    <img src="images/user1.png" alt="">
    <p class="username">@MoFawzy</p>
    </div>
    <div class="post-feed">
       <div class="post-overlays">
          <img src="images/icon/red-heart.png" alt="">
       </div>
       <div class="share-window">
       <h1>Share the post with other</h1>
       <div class="share-link-container">
         <input type="text" placeholder="https://www.SocialApp.com/user/posts/45@cdr" disabled>
         <button>Copy</button>
        </div>
     </div>
     <div class="post-img-container">
       <img src=${imgUrl} alt="">
     </div>
     </div>
     <div class="post-details">
      <div class="details">
       <i class='bx bx-heart like-icon'></i>
       <i class='bx bx-share share-icon'></i>
       <span class="likes"><span>0</span> likes</span>
     </div>
       <p class="post-desc">${postDesc}</p>
       <div class="comments-container">
     </div>
     <div class="comment-box">
       <input type="text" placeholder="Add a comment" class="comment-input">
       <button class="add-comment-btn"><i class='bx bx-message-rounded-dots comment-icon'></i></button>
       <span class="comment-count"><span>0</span> comment</span>
     </div>
    </div>
   </div>`;
  }
}
function addIntersectionPost(post) {
  //post like
  likePost(post);
  // post share
  sharePost(post);
  // comment
  addComment(post);
}
// add a post
let postInput = document.querySelector(".post-content");
let postIcon = document.querySelector(".post-icon");
let postCrt = document.querySelector(".create-post");
let mediaBtn = document.querySelector(".add-media");
let postBtn = document.querySelector(".posting");
let postContainer = document.querySelector(".post-container");
let chooseMedia = document.querySelector(".choose-media");
let postImg = document.querySelector(".post-img-container img");
let posts = Array.from(document.querySelectorAll(".post"));

postIcon.addEventListener("click", () => {
  postIcon.classList.toggle("bxs-plus-circle");
  postCrt.classList.toggle("hide");
});
let imgUrl;
chooseMedia.onchange = () => {
  let postImgUrl = URL.createObjectURL(chooseMedia.files[0]);
  imgUrl = postImgUrl;
};

postBtn.onclick = () => {
  if (!postInput.value) {
    return;
  }
  let newNode = document.createElement("div");
  newNode.innerHTML = createPost(postInput.value, imgUrl);
  postContainer.prepend(newNode);
  addIntersectionPost(newNode);
  postInput.value = "";
  imgUrl = "";
};

posts.forEach((post) => addIntersectionPost(post));