const narPics = require('../db.json')
let ident = 8

module.exports = {
    
    getCompliment: (req, res) => {
        let compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getSpirit: (req, res) => {
        const spiritDays = ['pajama day', 'crazy hair day', 'mix-match clothes day', 'funky hat day', 'Miscellaneous sock day']

        let randomSpirIndex = Math.floor(Math.random() * spiritDays.length);
        let randomDay = spiritDays[randomSpirIndex]
        res.status(200).send(randomDay)

    },
    getPictures: (req, res) => {
        res.status(200).send(narPics)
    },

    editPicture: (req, res) => {
        const { id } = req.params
        const { type } = req.body
        console.log(type)
        const index = narPics.findIndex((picture) => picture.id === +id)
        if( type === 'plus' && narPics[index].rating < 5) {
            // console.log('plus')
            narPics[index].rating++
        } else if (type === "minus" && narPics[index].rating > 0) {
            // console.log('-')
            narPics[index].rating--
        }
        res.status(200).send(narPics)
    }, 
    createPicture: (req, res) => {
        console.log(req.body)
        let { rating } = req.body
        req.body.id = ident
        req.body.rating = +rating
        narPics.push(req.body)
        res.status(200).send(narPics)
        ident++
    },
    deletePicture: (req, res) => {
        // console.log('deleted')
        const { id } = req.params
        const index = narPics.findIndex((pic) => pic.id === +id)
        narPics.splice(index, 1)
        res.status(200).send(narPics);
    }
}