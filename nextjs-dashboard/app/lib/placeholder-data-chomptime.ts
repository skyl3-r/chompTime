const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
        xp: 100
      },
      {
        id: '3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c',
        name: 'Skyler',
        email: 'e1156938@u.nus.edu',
        password: '654321',
        xp: 0
      }
]

const meetings = [{
    "id": "36258b12-cf84-422d-a2d5-efe8635002fd",
    "title": "Robust needs-based extranet",
    "startTime": "2024-12-19 11:05:47",
    "endTime": "2024-12-19 12:11:29",
    "locationLink": "https://is.gd/nisi.jpg?donec=posuere&pharetra=cubilia&magna=curae&vestibulum=duis&aliquet=faucibus&ultrices=accumsan&erat=odio&tortor=curabitur&sollicitudin=convallis&mi=duis&sit=consequat&amet=dui&lobortis=nec&sapien=nisi&sapien=volutpat&non=eleifend&mi=donec&integer=ut&ac=dolor&neque=morbi&duis=vel&bibendum=lectus&morbi=in&non=quam&quam=fringilla&nec=rhoncus&dui=mauris&luctus=enim&rutrum=leo"
    ,"dayReminderSent": true, "hourReminderSent": true
}, {
    "id": "220a961c-75f3-4236-aeb7-225aeb8ebf00",
    "title": "Cloned regional focus group",
    "startTime": "2024-12-31 14:30:52",
    "endTime": "2024-12-31 16:46:57",
    "locationLink": "http://plala.or.jp/platea/dictumst/etiam/faucibus.js?sit=tempus&amet=vel&eleifend=pede&pede=morbi&libero=porttitor&quis=lorem&orci=id&nullam=ligula&molestie=suspendisse&nibh=ornare&in=consequat&lectus=lectus&pellentesque=in&at=est&nulla=risus&suspendisse=auctor&potenti=sed&cras=tristique&in=in&purus=tempus&eu=sit&magna=amet&vulputate=sem&luctus=fusce&cum=consequat&sociis=nulla&natoque=nisl&penatibus=nunc&et=nisl&magnis=duis&dis=bibendum&parturient=felis&montes=sed&nascetur=interdum&ridiculus=venenatis&mus=turpis&vivamus=enim"
    ,"dayReminderSent": true, "hourReminderSent": true
}, {
    "id": "e7613b31-a285-4c3b-9d4a-f05f39682bea",
    "title": "Synergistic zero defect strategy",
    "startTime": "2024-12-27 21:00:26",
    "endTime": "2024-12-27 22:50:58",
    "locationLink": "https://behance.net/nunc/vestibulum/ante/ipsum/primis/in.aspx?vestibulum=eget&rutrum=tempus&rutrum=vel&neque=pede&aenean=morbi&auctor=porttitor&gravida=lorem&sem=id&praesent=ligula&id=suspendisse&massa=ornare&id=consequat&nisl=lectus&venenatis=in&lacinia=est&aenean=risus&sit=auctor&amet=sed&justo=tristique&morbi=in&ut=tempus&odio=sit&cras=amet&mi=sem&pede=fusce&malesuada=consequat&in=nulla&imperdiet=nisl&et=nunc&commodo=nisl&vulputate=duis&justo=bibendum&in=felis&blandit=sed&ultrices=interdum&enim=venenatis&lorem=turpis&ipsum=enim&dolor=blandit&sit=mi&amet=in&consectetuer=porttitor&adipiscing=pede&elit=justo&proin=eu&interdum=massa&mauris=donec&non=dapibus&ligula=duis&pellentesque=at&ultrices=velit&phasellus=eu&id=est&sapien=congue&in=elementum&sapien=in&iaculis=hac&congue=habitasse&vivamus=platea&metus=dictumst&arcu=morbi&adipiscing=vestibulum&molestie=velit&hendrerit=id&at=pretium&vulputate=iaculis&vitae=diam&nisl=erat"
    ,"dayReminderSent": true, "hourReminderSent": true
}, {
    "id": "128216a8-1e05-499d-b465-4859f5e4a523",
    "title": "Synergistic zero defect strategy 2",
    "startTime": "2025-01-27 21:00:26",
    "endTime": "2025-01-27 22:50:58",
    "locationLink": "https://behance.net/nunc/vestibulum/ante/ipsum/primis/in.aspx?vestibulum=eget&rutrum=tempus&rutrum=vel&neque=pede&aenean=morbi&auctor=porttitor&gravida=lorem&sem=id&praesent=ligula&id=suspendisse&massa=ornare&id=consequat&nisl=lectus&venenatis=in&lacinia=est&aenean=risus&sit=auctor&amet=sed&justo=tristique&morbi=in&ut=tempus&odio=sit&cras=amet&mi=sem&pede=fusce&malesuada=consequat&in=nulla&imperdiet=nisl&et=nunc&commodo=nisl&vulputate=duis&justo=bibendum&in=felis&blandit=sed&ultrices=interdum&enim=venenatis&lorem=turpis&ipsum=enim&dolor=blandit&sit=mi&amet=in&consectetuer=porttitor&adipiscing=pede&elit=justo&proin=eu&interdum=massa&mauris=donec&non=dapibus&ligula=duis&pellentesque=at&ultrices=velit&phasellus=eu&id=est&sapien=congue&in=elementum&sapien=in&iaculis=hac&congue=habitasse&vivamus=platea&metus=dictumst&arcu=morbi&adipiscing=vestibulum&molestie=velit&hendrerit=id&at=pretium&vulputate=iaculis&vitae=diam&nisl=erat"
    ,"dayReminderSent": false, "hourReminderSent": false  
}]

const tasks = [{"id":"bd893b88-eb45-4432-aaad-a36070f15281","title":"Nullam porttitor lacus at turpis.","duedate":"2025-01-18 02:52:02","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"410544b2-4001-4271-9855-fec4b6a6442a","meetingId":"36258b12-cf84-422d-a2d5-efe8635002fd","priority":"medium","status":"pending","dayReminderSent": false, "hourReminderSent": false},
    {"id":"0ce4e68e-5fa6-4e63-b3ac-0ac966a69b73","title":"Pellentesque viverra pede ac diam.","duedate":"2025-07-15 01:50:18","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"410544b2-4001-4271-9855-fec4b6a6442a","meetingId":"220a961c-75f3-4236-aeb7-225aeb8ebf00","priority":"low","status":"completed","dayReminderSent": false, "hourReminderSent": false},
    {"id":"507d70a8-3d59-4156-9f49-cb2bce36f5ff","title":"Nullam molestie nibh in lectus.","duedate":"2025-09-23 12:59:03","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"410544b2-4001-4271-9855-fec4b6a6442a","meetingId":"220a961c-75f3-4236-aeb7-225aeb8ebf00","priority":"low","status":"completed","dayReminderSent": false, "hourReminderSent": false},
    {"id":"2d895a1c-8262-4c4d-9fa0-30331e5eddf3","title":"Mauris sit amet eros.","duedate":"2025-10-31 01:40:13","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"410544b2-4001-4271-9855-fec4b6a6442a","meetingId":"e7613b31-a285-4c3b-9d4a-f05f39682bea","priority":"medium","status":"completed","dayReminderSent": false, "hourReminderSent": false},
    {"id":"afeb4c69-10b9-48ed-8590-600a3725f63a","title":"Nam dui.","duedate":"2025-11-01 08:50:34","assignedId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","assignerId":"410544b2-4001-4271-9855-fec4b6a6442a","meetingId":"36258b12-cf84-422d-a2d5-efe8635002fd","priority":"medium","status":"pending","dayReminderSent": false, "hourReminderSent": false},
    {"id":"e687cce6-d460-466e-9b01-cde208ecc4a9","title":"Aenean auctor gravida sem.","duedate":"2025-01-30 21:03:59","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"410544b2-4001-4271-9855-fec4b6a6442a","meetingId":"36258b12-cf84-422d-a2d5-efe8635002fd","priority":"high","status":"completed","dayReminderSent": false, "hourReminderSent": false},
    {"id":"c0367c39-2b29-4846-87ce-3f581c056de6","title":"Nullam molestie nibh in lectus.","duedate":"2025-06-02 17:23:46","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","meetingId":"36258b12-cf84-422d-a2d5-efe8635002fd","priority":"high","status":"pending","dayReminderSent": false, "hourReminderSent": false},
    {"id":"7bbea3e6-fd9c-4959-b6b0-0e76e5ec89ce","title":"In quis justo.","duedate":"2025-01-30 21:40:15","assignedId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","assignerId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","meetingId":"36258b12-cf84-422d-a2d5-efe8635002fd","priority":"low","status":"pending","dayReminderSent": false, "hourReminderSent": false},
    {"id":"fa8bc595-d60c-4d80-8ddf-67f821e2d959","title":"Donec dapibus.","duedate":"2025-12-19 18:35:47","assignedId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","assignerId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","meetingId":"e7613b31-a285-4c3b-9d4a-f05f39682bea","priority":"medium","status":"completed","dayReminderSent": false, "hourReminderSent": false},
    {"id":"2a2adcdf-615a-4b92-8b1b-4ed6c549de31","title":"Pellentesque viverra pede ac diam.","duedate":"2025-11-02 20:38:29","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","meetingId":"220a961c-75f3-4236-aeb7-225aeb8ebf00","priority":"medium","status":"pending","dayReminderSent": false, "hourReminderSent": false},
    {"id":"1b7ad003-73c6-4264-a78c-581c99b2ed27","title":"Nulla mollis molestie lorem.","duedate":"2025-02-20 17:58:26","assignedId":"410544b2-4001-4271-9855-fec4b6a6442a","assignerId":"3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c","meetingId":"220a961c-75f3-4236-aeb7-225aeb8ebf00","priority":"low","status":"completed","dayReminderSent": false, "hourReminderSent": false}]

const participants = [
    {
        "id": "6cb5a820-c456-46b2-8b7c-40f2b9c41fd7",
        "userId": "410544b2-4001-4271-9855-fec4b6a6442a",
        "meetingId": "36258b12-cf84-422d-a2d5-efe8635002fd",
    },
    {
        "id": "bfa19c8d-8c9d-4fad-b62e-0612d6174aed",
        "userId": "410544b2-4001-4271-9855-fec4b6a6442a",
        "meetingId": "220a961c-75f3-4236-aeb7-225aeb8ebf00",
    },
    {
        "id": "4f9a4996-9add-4dbb-9b9f-23089a8d3d4a",
        "userId": "410544b2-4001-4271-9855-fec4b6a6442a",
        "meetingId": "e7613b31-a285-4c3b-9d4a-f05f39682bea",
    },
    {
        "id": "c2a7b955-37f6-4481-b37f-448ecb033bf3",
        "userId": "3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c",
        "meetingId": "36258b12-cf84-422d-a2d5-efe8635002fd",
    },
    {
        "id": "79f1a8af-a179-40d5-85d8-5268a5a5ed53",
        "userId": "3b23b83d-b8b0-4a3c-95d5-4f23b86b7c6c",
        "meetingId": "e7613b31-a285-4c3b-9d4a-f05f39682bea",
    },   
]

const finishedsummaries = [
    {
        "id": "0795e9a4-2372-4e82-aa26-1e6110ba17d0",
        "meetingId": "36258b12-cf84-422d-a2d5-efe8635002fd",
        "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    }, {
        "id": "98c6b676-34da-4b4f-9c60-a3ed7fa0d36f",
        "meetingId": "220a961c-75f3-4236-aeb7-225aeb8ebf00",
        "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    }, {
        "id": "6d4a1417-4fd1-46a6-80de-97b1112f0bdf",
        "meetingId": "e7613b31-a285-4c3b-9d4a-f05f39682bea",
        "description": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    },
]

export {users, meetings, tasks, participants, finishedsummaries};