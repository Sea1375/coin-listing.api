var models  = require('./../models');

module.exports.addEntry = (req, res, next) => {
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

module.exports.getEntries = async (req, res, next) => {
    var query = `select t1.*, t2.name from entries t1 LEFT JOIN (
        select entry_id, name from coin_listings GROUP BY entry_id, name
    ) t2 ON t1.id = t2.entry_id`
    const [results, metadata] = await models.sequelize.query(query);

    return res.status(200).json(results)
}

module.exports.setSetting = async (req, res, next) => {
    let value = req.body.value;

    let setting = await models.setting.findOne({ where: { key: req.body.key } });
    if (setting === null) {
        models.setting.create({key: req.body.key, value: value}).then(result => {
            return res.status(200).json(result)
        }).catch(next)
    } else {
        setting.value = value;
        await setting.save();
        return res.status(200).json(setting)
    }
}

module.exports.getSetting = async (req, res, next) => {
    let setting = await models.setting.findOne({ where: { key: req.body.key } });
    if (setting === null) {
        return res.status(200).json({})
    } else {
        return res.status(200).json(setting)
    }
}