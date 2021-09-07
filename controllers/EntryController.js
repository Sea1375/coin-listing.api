var models  = require('./../models');

module.exports.addEntry = (req, res, next) => {
    console.log(req.body);
    models.entry.create(req.body).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}

module.exports.removeEntry = (req, res, next) => {
    // models.entry.create(req.body).then(result => {
    //     return res.status(200).json(result)
    // }).catch(next)

    models.entry.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        models.coin_listing.destroy({
            where: {
                entry_id: req.body.id
            }
        }).then(() => {
            return res.status(200).json({success: true})
        })
        
    }).catch(next)

}

module.exports.getEntries = (req, res, next) => {
    models.entry.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(results => {
        return res.status(200).json(results)
    }).catch(next)
}