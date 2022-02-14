const Book = require("../models/Book");
const AsynManager = require("../utils/asyncManager");
const LibraryError = require("../utils/libraryError");



exports.createBook = AsynManager(async (req, res, next) =>{
    const newbook = await Book.create(req.body);
    return res.status(201).json({success:true, data:newbook});
});


exports.getAllBooks = AsynManager(async (req, res, next)=>{
    const books = await Book.find();
    return res.status(200).json({success:true, total:books.length, data:books})
});

exports.getBook = AsynManager(async (req, res, next)=>{
    const book = await Book.findById(req.params.id)
    
    if(!book){
        return next(new LibraryError(`That book is not avilable`,404));
    }
    return res.status(200).json({success:true, data:books})

});

exports.getPublishedBooks = AsynManager(async (req, res, next)=>{
    const books = await Book.find({published:true});
    return res.status(200).json({success:true, data:books})
});


exports.updateBook = AsynManager(async (req, res, next)=>{
    let book = await Book.findById(req.params.id);

    if(!book){
        return next(new LibraryError('That is not avilable', 404));
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    return res.status(200).json({success:true, data:books});
});

exports.deleteBook = AsynManager(async (req, res, next)=>{
    const book = await Book.findById(req.params.id);

    if(!book){
        return next(new LibraryError('That book is not find',404));
    }

    await book.remove();

    return res.status(200).json({success:true, data:{}});
});