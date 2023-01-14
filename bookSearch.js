const istAllSize = 15;

$(function () {
  /**
   * 検索ボタン押下
   */
  $("#sendKey").click(function () {
    const url =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      $("#isbnkey").val() +
      "&maxResults=5";
    getBookList(url);
  });

  /**
   * ページングリンク押下
   */
  $(".page-numbers").click(function () {
    console.log($(this).text());
    const startIndex = $(this).text() + 4;
    const url =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      $("#isbnkey").val() +
      "&startIndex=" +
      startIndex +
      "&maxResults=5";

    getBookList(url);
  });

  /**
   * APIアクセスし一覧部分のhtml作成するファンクション
   * @param {*} url
   */
  function getBookList(url) {
    $.ajax({
      url: url,
      dataType: "json",
    }).done(function (data) {
      console.log(data);
      //Jsonの取得サイズ
      const len = data.items.length;
      let html;
      for (let i = 0; i < len; i++) {
        console.log(data.items[i].volumeInfo.imageLinks);
        if (typeof data.items[i].volumeInfo.publisher == "undefined") {
          data.items[i].volumeInfo.publisher = "出版社不明";
        }
        html += `
            <tr class="bookcont">
                <td>${data.items[i].volumeInfo.title}</td>
                <td>${data.items[i].volumeInfo.authors}</td>
                <td>${data.items[i].volumeInfo.publisher} </td>
            `;
        if (typeof data.items[i].volumeInfo.imageLinks == "undefined") {
          html += `
          <td>画像なし</td>
          `;
        } else {
          html += `
          <td><img src="${data.items[i].volumeInfo.title}"></td>
          `;
        }
        html += ` </tr>`;
      }
      //表示部分削除
      $(".bookcont").empty();
      //html表示
      $("#booksection").css("display", "block");
      $("#boklist").hide().append(html).fadeIn(1000);
    });
  }

  /**
   * ページング部分
   */
  function listPagination() {
    //1ページの表示で割った物
    let pageListCount = istAllSize / 5;
    //作り途中
  }
});
