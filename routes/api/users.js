const Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/api/users',
    handler: function(request, reply) {
        const sql = 'SELECT * FROM users';
        request.pg.client.query(sql, function(err, result) {
            if (err) {
                return reply([]);
            }
            return reply(result.rows);
        });
    }
}, {
    method: 'GET',
    path: '/api/users/{pk}',
    handler: function(request, reply) {
        const { pk } = request.params;
        const sql = 'SELECT * FROM users WHERE pk=$1';
        request.pg.client.query(sql, [pk], function(err, result) {
            if (err) {
                return reply([]);
            }
            return reply(result.rows);
        });
    }
}, {
    method: 'POST',
    path: '/api/users',
    config: {
        handler: function(request, reply) {
            const sql = 'INSERT INTO users (name, lastname, birthdate) VALUES ($1, $2, $3) RETURNING *';
            const { name } = request.payload;
            const { lastname } = request.payload;
            const { birthdate } = request.payload;
            request.pg.client.query(sql, [name, lastname, birthdate], function(err, result) {
                if (err) {
                    return reply([]);
                }
                return reply(result.rows);
            });
        },
        validate: {
            payload: Joi.object().keys({
                name: Joi.string().min(1).max(10).required(),
                lastname: Joi.string().required(),
                birthdate: Joi.string().required()
            })
        }
    }
}];