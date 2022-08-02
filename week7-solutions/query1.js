db = db.getSiblingDB('wikipedia')

db.revisions.find().forEach(function(doc){ 
    doc.timestamp = new ISODate(doc.timestamp); 
    db.revisions.save(doc);
});

cursor = db.getCollection("revisions").find(
    {
        title: "CNN", 
        timestamp: {$gte: new Date("2020-01-01")}
    }
);
    
while (cursor.hasNext()) {
    printjson(cursor.next());
}