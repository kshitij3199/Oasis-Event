function nextChapter(i) {
    var new_score = Number(document.getElementById('y_score').innerHTML) + Number(document.getElementById('game-over-score').innerHTML);
    db.collection("users").doc(user1.displayName).set({ score: new_score, chapter_status: i }, { merge: true }).then(function() {
        console.log("Document successfully written!");
        if(i!=6) {
            var current_url = window.location.href;
            var new_url = current_url.split("_")[0] + "_" + i + ".html";
            window.location.href = new_url;
        }
        else {
            var current_url = window.location.href;
            var new_url = current_url.split("c")[0] + "results.html";
            window.location.href = new_url;
        }
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}