const url = new URL(location.href);
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

console.log("movieId in movie.js: " + movieId); // for debugging
console.log("movieTitle in movie.js: " + movieTitle); // for debugging

// const APILINK = 'http://localhost:3000/api/v1/reviews/';
const APILINK = 'https://2a79-46-193-66-139.ngrok-free.app/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`

main.appendChild(div_new);

returnReviews(APILINK);

// function returnReviews(url) {
//     fetch(url + "movie/" + movieId).then(res => res.json()).then(function (data) {
//         console.log(data);
//         data.forEach(review => {
//             const div_card = document.createElement("div");
//             div_card.innerHTML = `
//                 <div class="row">
//                     <div class="column">
//                     <div class="card" id="${review._id}">
//                         <p><strong>Review: </strong>${review.review}</p>
//                         <p><strong>User: </strong>${review.user}</p>
//                         <p><a href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑</a></p>
//                     </div>
//                     </div>
//                 </div>
//             `;
//             main.appendChild(div_card);
//         });
//     });
// }

function returnReviews(url) {
    console.log("Fetching reviews from URL:", url + "movie/" + movieId); // デバッグ用のログ
    fetch(url + "movie/" + movieId)
        .then(res => {
            console.log("Response status:", res.status); // ステータスコードをログに出力
            return res.text(); // JSONでない可能性があるため、テキストとしてレスポンスを取得
        })
        .then(text => {
            console.log("Response text:", text); // レスポンステキストをログに出力
            try {
                const data = JSON.parse(text); // テキストをJSONとしてパース
                data.forEach(review => {
                    const div_card = document.createElement("div");
                    div_card.innerHTML = `
                        <div class="row">
                            <div class="column">
                            <div class="card" id="${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <p><a href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑</a></p>
                            </div>
                            </div>
                        </div>
                    `;
                    main.appendChild(div_card);
                });
            } catch (error) {
                console.error('Error parsing JSON:', error); // JSONパースエラーをキャッチ
                console.error('Original response text:', text); // 元のレスポンスを表示
            }
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
}


function editReview(id, review, user) {
    // console.log(review)
    const element = document.getElementById(id);
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    element.innerHTML = `
              <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
              </p>
    `
}

function saveReview(reviewInputId, userInputId, id = "") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (id) {
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "user": user, "review": review })
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    } else {
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "user": user, "review": review, "movieId": movieId })
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    }
}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: 'DELETE'
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload();
        });
}