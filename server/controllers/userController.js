const mysql = require('mysql');

//Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
});


//Tesst Purpose

exports.test = (req, res) => {
    res.render('index', { layout: false });
}


//again Test
exports.login = (req, res) => {
    res.render('login', { layout: false });
}


//access admin dashboard
exports.access = (req, res) => {

    res.render('admin', { layout: false });
}

//View All IIT students
exports.iit = (req,res) =>{


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student WHERE Dept = "IIT"', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('IIT', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}


//view of all cse students
exports.cse = (req,res) =>{


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student WHERE Dept = "CSE"', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('CSE', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}

//view all IBA students
exports.iba = (req,res) =>{


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student WHERE Dept = "IBA"', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('IBA', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}




//view all student of batch 47
exports.batch = (req,res) =>{


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student WHERE Batch = 47', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('Batch', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}

//view 48 Batch
exports.batch1 = (req,res) =>{


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student WHERE Batch = 48', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('Batch1', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}


//view of 49 batch students

exports.batch2 = (req,res) =>{


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student WHERE Batch = 49', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('Batch2', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}


//log out from admin panal
exports.logout = (req, res) => {
    res.render('index', { layout: false });
}




//View Users
exports.view = (req, res) => {




    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT id,Name,Phone,Email,Hall,Batch,Dept FROM Student', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });




}

//Find student by search
exports.find = (req, res) => {


    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        let searchTerm = req.body.search;

        //User the connection
        connection.query('SELECT *FROM Student WHERE Name LIKE ? OR HALL LIKE ?  OR id LIKE ? OR BATCH LIKE ? OR Dept LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}




exports.form = (req, res) => {
    res.render('add-user');
}




//Add new Profile
exports.create = (req, res) => {

    const { id, Name, Phone, Email, Hall, Batch, Dept } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        connection.query("INSERT INTO `Student`(`id`,`Name`,`Phone`,`Email`, `Hall` ,`Batch`,`Dept`) VALUES ('" + id + "','" + Name + "','" + Phone + "','" + Email + "','" + Hall + "','" + Batch + "','" + Dept + "');", (err, rows) => {
            // Once done, release connection
            connection.release();

            if (!err) {
                res.render('add-user', { alert: 'Student Added Successfully 😊😊' });
            } else {
                console.log(err);
            }

        });
    });
};


//Edit Profile
exports.edit = (req, res) => {

    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT *FROM Student where id = ?', [req.params.id], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('edit-user', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });


}


//Update Profile
exports.update = (req, res) => {

    const { id, Name, Phone, Email, Hall, Batch, Dept } = req.body;
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('UPDATE Student SET id = ?,Name = ?,Phone = ?,Email = ?,Hall = ?,Batch = ?,Dept = ? WHERE id = ?', [id, Name, Phone, Email, Hall, Batch, Dept, req.params.id], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log('Connection as ID' + connection.threadId);


                    //User the connection
                    connection.query('SELECT *FROM Student where id = ?', [req.params.id], (err, rows) => {
                        //when done with the connection,release it

                        connection.release();

                        if (!err) {
                            res.render('edit-user', { alert: 'Successfully Updated Hurrah!😁' });
                        }
                        else {
                            console.log(err);
                        }

                        console.log('The data from the table:\n', rows);

                    });


                });

            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });


}


//Delete Profile
exports.delete = (req, res) => {


    //Connect to DB

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('DELETE FROM Student where id = ?', [req.params.id], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.redirect('/home');
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}


//View Profile

exports.viewall = (req, res) => {

    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT *FROM Student WHERE id = ?;SELECT Date,Activity,Points FROM ActivityTrack WHERE ID = ?;SELECT SUM(Points) AS Total FROM ActivityTrack WHERE ID = ?', [req.params.id,req.params.id,req.params.id], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            // console.log(rows[0]);
            // console.log(rows[1]);
            var eye1=rows[0];
            var eye2=rows[1];
            var eye3=rows[2];
            

             if (!err) {
                 res.render('view-user', {eye1,eye2,eye3});
             }
             else {
                console.log(err);
             }

             console.log('The data from the table:\n', rows);

        });


    });

}


//Tracking section



//open the page
exports.trackaccess = (req, res) => {


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        //User the connection
        connection.query('SELECT *FROM ActivityTrack', (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('tracking', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });
}


//Add new Activity
exports.enter = (req, res) => {
    res.render('newActivity');
}

//new Acitvity insert

exports.insert = (req, res) => {


    const { ID, Date, Activity, Points } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        let searchTerm = req.body.search;

        //User the connection
        connection.query('INSERT INTO ActivityTrack SET ID= ?,Date = ?,Activity = ?,Points = ?', [ID, Date, Activity, Points], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('newActivity', { alert: 'Activity Added Successfully 😊😊😁' });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}


//check activity list
exports.check = (req, res) => {


    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        let searchTerm = req.body.InsertRoll;

        //User the connection
        connection.query('SELECT Name,Date,Activity,Points,Dept FROM ActivityTrack INNER JOIN Student ON ActivityTrack.ID=Student.id WHERE ActivityTrack.ID = ?', [searchTerm], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('tracklist', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });
}



//activity from home
exports.entr = (req, res) => {

    var text=req.params.id
    res.render('activity-from-home', { text });

}

//activity insert from home
exports.entract=(req,res)=>{
    const { ID, Date, Activity, Points } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID' + connection.threadId);


        let searchTerm = req.body.search;

        //User the connection
        connection.query('INSERT INTO ActivityTrack SET ID= ?,Date = ?,Activity = ?,Points = ?', [ID, Date, Activity, Points], (err, rows) => {
            //when done with the connection,release it

            connection.release();

            if (!err) {
                res.render('activity-from-home', { alert: 'Activity Added Successfully 😊😊😁' });
            }
            else {
                console.log(err);
            }

            console.log('The data from the table:\n', rows);

        });


    });

}