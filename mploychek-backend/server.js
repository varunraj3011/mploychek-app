const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    id: '1',
    userid: 'admin',
    password: 'admin123',
    role: 'Admin'
  },
  {
    id: '2',
    userid: 'varun',
    password: 'varun123',
    role: 'General User'
  }
];
const records = [
  { id: '1', title: 'Background Check',   status: 'Completed', userid: 'varun' },
  { id: '2', title: 'Document Verify',    status: 'Pending',   userid: 'varun' },
  { id: '3', title: 'Employment Check',   status: 'Completed', userid: 'admin' },
  { id: '4', title: 'Criminal Record',    status: 'In Progress',userid: 'admin' },
  { id: '5', title: 'Reference Check',    status: 'Completed', userid: 'varun' },
];

app.post('/api/login', (req, res) => {

  const { userid, password } = req.body;

  const user = users.find(
    u => u.userid === userid &&
         u.password === password
  );

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    });
  }

});
// GET /api/records?userid=varun&delay=2000
app.get('/api/records', async (req, res) => {
  const { userid, role, delay } = req.query;

  if (delay) {
    await new Promise(resolve => setTimeout(resolve, parseInt(delay)));
  }

  if (role === 'Admin') {
    res.json(records);
  } else {
    res.json(records.filter(r => r.userid === userid));
  }
});


// GET /api/users — get all users (Admin only)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST /api/users — add new user
app.post('/api/users', (req, res) => {
  const { userid, password, role } = req.body;
  const newUser = {
    id: (users.length + 1).toString(),
    userid,
    password,
    role
  };
  users.push(newUser);
  res.json(newUser);
});

// DELETE /api/users/:id — delete user by id
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});

