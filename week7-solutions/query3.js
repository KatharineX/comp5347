db = db.getSiblingDB('wikipedia')

cursor = db.getCollection("revisions").aggregate(
    [
        {
            $match: {
                title: { 
                    $in: ["CNN", "BBC"]
                }, 
                minor: true
            }
        },
        {
            $group: {
                _id:"$title", 
                numOfEdits: {
                    $sum: 1
                }
            }
        }
    ]
);

while (cursor.hasNext()) {
    printjson(cursor.next());
}