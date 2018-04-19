const Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/api/patient/',
    config: {
        handler: function(request, reply) {
            const sql = 'SELECT * FROM patient';
            request.pg.client.query(sql, function(err, result) {
                if (err) {
                    return reply([]);
                }
                return reply(result.rows);
            });
        }
    }
}, {
    method: 'GET',
    path: '/api/patient/name',
    config: {
        handler: function(request, reply) {
            const { name } = request.query;
            const sql = 'SELECT pk, name AS nombre, lastname AS apellido, birthdate AS nacimiento FROM patient WHERE name=$1';
            request.pg.client.query(sql, [name], function(err, result) {
                if (err) {
                    return reply([]);
                }
                return reply(result.rows[0]);
            });
        }
    }
}, {
    method: 'POST',
    path: '/api/patient/',
    config: {
        handler: function(request, reply) {
            const sql = 'INSERT INTO patient (name, lastname, email, birthdate) VALUES ($1, $2, $3, $4) RETURNING pk, name AS nombre';
            const { name } = request.payload;
            const { lastname } = request.payload;
            const { email } = request.payload;
            const { birthdate } = request.payload;
            request.pg.client.query(sql, [name, lastname, email, birthdate], function(err, result) {
                if (err) {
                    return reply([]);
                }
                return reply(result.rows[0]);
            });
        },
        validate: {
            payload: Joi.object().keys({
                name: Joi.string().required(),
                lastname: Joi.string().allow('').required(),
                email: Joi.string().email().required(),
                birthdate: Joi.string().required()
            })
        }
    }
}, {
    method: 'PATCH',
    path: '/api/patient/',
    config: {
        handler: function(request, reply) {
            const { pk } = request.payload;
            const { name } = request.payload;
            const { code } = request.payload;
            const { price } = request.payload;
            const { active } = request.payload;
            const sql = 'UPDATE patient SET name = $1, code = $2, price = $3, active = $4 WHERE pk=$5';
            request.pg.client.query(sql, [name, code, price, active], function(err, result) {
                if (err) {
                    return reply([]);
                }
                return reply(result.rows);
            });
        },
        validate: {
            payload: Joi.object().keys({
                pk: Joi.string().required(),
                name: Joi.string().required(),
                code: Joi.string().min(1).max(10).required(),
                price: Joi.number().required(),
                active: Joi.boolean().required()
            })
        }
    }
}, {
    method: 'DELETE',
    path: '/api/patient/',
    config: {
        handler: function(request, reply) {
            const sql = 'DELETE FROM patient WHERE name=$1';
            const { name } = request.payload;
            request.pg.client.query(sql, [name], function(err, result) {
                if (err) {
                    return reply([]);
                }
                return reply({ deleted: true });
            });
        },
        validate: {
            payload: Joi.object().keys({
                name: Joi.string().required()
            })
        }
    }
}];