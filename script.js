
    // const addFormButton = document.querySelector(".add-form-button");
    // const commentsList = document.querySelector(".comments");
    // const nameInput = document.querySelector(".add-form-name");
    // const textInput = document.querySelector(".add-form-text");
    // const commentsState = [
    //  {
    //    id: 1,
    //    name: "Глеб Фокин",
    //    text: "Это будет первый комментарий на этой странице",
    //    date: "12.02.22 12:18",
    //    likesCount: 3,
    //    isLiked: false
    //   },
    //  {
    //    id: 2,
    //    name: "Варвара Н.",
    //    text: "Мне нравится как оформлена эта страница! ❤",
    //    date: "13.02.22 19:22",
    //    likesCount: 75,
    //    isLiked: true
    //   }
    // ];
  
    // function escapeHtml(str) {
    //  if (!str) return "";
    //  return String(str)
    //   .replaceAll("<", "&lt;")
    //   .replaceAll(">", "&gt;")
    // }
      
    // function renderComments() {
    //  commentsList.innerHTML = "";

    //  commentsState.forEach((comment) => {
    //    const li = document.createElement("li");
    //    li.className = "comment";
    //    li.dataset.id = String(comment.id);
      
    //    const header = document.createElement("div");
    //    header.className = "comment-header";

    //    const nameDiv = document.createElement("div");
      
    //    nameDiv.textContent = escapeHtml(comment.name);

    //    const dateDiv = document.createElement("div");
    //    dateDiv.textContent = escapeHtml(comment.date);

    //    header.appendChild(nameDiv);
    //    header.appendChild(dateDiv);

    //    const body = document.createElement("div");
    //    body.className = "comment-body";

    //    const textDiv = document.createElement("div");
    //    textDiv.className = "comment-text";
      
    //    textDiv.textContent = escapeHtml(comment.text);

    //    body.appendChild(textDiv);

    //    const footer = document.createElement("div");
    //    footer.className = "comment-footer";

    //    const likesWrap = document.createElement("div");
    //    likesWrap.className = "likes";

    //    const likesCounter = document.createElement("span");
    //    likesCounter.className = "likes-counter";
    //    likesCounter.textContent = comment.likesCount;

    //    const likeButton = document.createElement("button");
    //    likeButton.className = "like-button";
      
    //    if (comment.isLiked) {
    //      likeButton.textContent = ""; 
    //      likeButton.classList.add("-active-like");
    //     } else {
    //       likeButton.textContent = ""; 
    //     }

    //    likeButton.dataset.id = String(comment.id);

    //    likesWrap.appendChild(likesCounter);
    //    likesWrap.appendChild(likeButton);
    //    footer.appendChild(likesWrap);

    //    li.appendChild(header);
    //    li.appendChild(body);
    //    li.appendChild(footer);
    //    commentsList.appendChild(li);
    //   });
    // }

    // renderComments();

    // commentsList.addEventListener("click", (event) => {
   
    //  const btn = event.target.closest(".like-button");
    //  if (btn) {
    //    event.stopPropagation(); 
      
    //    const id = Number(btn.dataset.id);
    //    const comment = commentsState.find((c) => c.id === id);
    //    if (!comment) return;

    //    comment.isLiked = !comment.isLiked;
    //    comment.likesCount = comment.isLiked ? comment.likesCount + 1 : comment.likesCount - 1;

    //    renderComments();
    //    return;
    //   }
    
    //   const li = event.target.closest(".comment");
    //   if (!li) return;

    //   const id = Number(li.dataset.id);
    //   const comment = commentsState.find((c) => c.id === id);
    //   if (!comment) return;
    
    //   textInput.value = ` ${comment.name}:${comment.text}`;
    
    //   textInput.focus();
    // });

    // addFormButton.addEventListener("click", function () {
    //   const name = nameInput.value.trim();
    //   const text = textInput.value.trim();

    //   if (!name || !text) {
    //     alert("Пожалуйста, заполните имя и текст комментария.");
    //     return;
    //   }
    
    //   const safeName = escapeHtml(name);
    //   const safeText = escapeHtml(text);

    //   const nextId =
    //   commentsState.length > 0
    //   ? Math.max(...commentsState.map((c) => c.id)) + 1
    //   : 1;

    //   commentsState.push({
    //    id: nextId,
    //    name: safeName,
    //    text: safeText, 
    //    date: new Date().toLocaleString("ru-RU", {
    //      day: "2-digit",
    //      month: "2-digit",
    //      year: "2-digit",
    //      hour: "2-digit",
    //      minute: "2-digit"
    //     }),
    //    likesCount: 0,
    //    isLiked: false
    //   });

    //  nameInput.value = "";
    //  textInput.value = "";

    //  renderComments();
    // });