module.exports = (ISequelize, Sequelize, uuid) => {
    var bruhSchema = {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile_phone:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Mobile phone already in use, please use another one.'
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use, please use another one.'
            }
        },
        address: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE',
            validate:{
                isIn: {
                    args: [['ACTIVE', 'INACTIVE', 'DELETED']],
                    msg: 'Status is not in Activation Status List.'
                }
                // isActivationStatus(value){
                //     if(!['ACTIVE', 'INACTIVE'].includes(value)){
                //         throw new Error(value + ' is not in Activation Status List.');
                //     }
                // }
            }
        }
        // created_by: {
        //     type: Sequelize.DATE,
        //     allowNull: false
        // },
        // updated_by: {
        //     type: Sequelize.DATE,
        //     allowNull: false
        // }

    }
    var bruhOptions = {
        tableName: 'bruhs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    }
    const Bruh = ISequelize.define('Bruh', bruhSchema, bruhOptions)

    Bruh.beforeCreate((bruh, _) => {
        bruh.id = uuid.v4()
        return bruh
    })
    return Bruh
}