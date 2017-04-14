import Mock from 'mockjs'

export default {
  'GET /messages': (req, res) => {
    const page = parseInt(req.query.page, 10)
    res.json(Mock.mock({
      success: true,
      data: {
        page: page || 1,
        pageSize: 20,
        totalPage: 10,
        'data|1-20': [
          {
            id: '@id',
            name: '@cname',
            email: '@email',
          },
        ],
      },
    }))
  },
}
