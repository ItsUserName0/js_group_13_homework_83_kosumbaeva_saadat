const published = async (role, entity) => {
  if (role) {
    if (role === 'user') {
      return await entity.find({is_published: true}, null, {sort: {'_id': -1}});
    } else {
      return await entity.find(null, null, {sort: {'_id': -1}});
    }
  } else {
    return await entity.find({is_published: true}, null, {sort: {'_id': -1}});
  }
};

module.exports = published;