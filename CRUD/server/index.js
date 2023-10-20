const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Parts')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const app = express()
app.use(cors())
app.use(express.json())

cloudinary.config({ 
    cloud_name: 'drkylofaz', 
    api_key: '661556862419834', 
    api_secret: 'pPUDxvdi6CioNu1ehg3oNrfcKFo'
  });

mongoose.connect("mongodb+srv://nurdauletitemgen20:nurdau___002@database.ctulckv.mongodb.net/CRUD")

app.get('/', (req, res) => {
    UserModel.find({})
    .then(parts => res.json(parts))
    .catch(err => res.json(err))
})

app.get('/getParts/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(parts => res.json(parts))
    .catch(err => res.json(err))
})

app.put('/updateParts/:id',(req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name_of_part: req.body.name_of_part,
        carname:req.body.carname,
        model:req.body.model,
        year:req.body.year
    })
    .then(parts => res.json(parts))
    .catch(err => res.json(err))
})


app.delete('/deleteParts/:id',(req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(parts => res.json(parts))
    .catch(err => res.json(err))
})

app.post("/createParts",(req, res) => {
    UserModel.create(req.body)
    .then(parts => res.json(parts))
    .catch(err => res.json(err))
} )

const upload = multer({ dest: 'uploads/' }); 

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
    }
    const imageUrl = result.secure_url;
    res.status(200).json({ imageUrl });
  });
});

app.get('/allImages', async (req, res) => {
    try {
      const { resources } = await cloudinary.search
        .expression('resource_type:image')
        .execute();
  
      const imageUrls = resources.map((resource) => resource.secure_url);
  
      res.json(imageUrls);
    } catch (error) {
      console.error('Error fetching images from Cloudinary:', error);
      res.status(500).json({ error: 'An error occurred while fetching images.' });
    }
  });


app.listen(3001, () => {
    console.log("Server is Running")
})



