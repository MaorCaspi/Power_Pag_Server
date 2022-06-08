const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    }

    cb(null, false);
}

//multer options
const upload = multer({
    //dest: 'images/',
    storage,
    limits: {
        fileSize: 1024*1024*7 //Max size of file = 7 mb
    },
    fileFilter
});

module.exports=upload;