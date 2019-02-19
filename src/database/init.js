const { query, conn } = require('./index')
const roles = [
  {
    name: '超级管理员',
    code: '0',
  },
  {
    name: '管理员',
    code: '1',
  },
  {
    name: '版主',
    code: '2',
  },
  {
    name: '会员',
    code: '3',
  },
]

const subjects = [
  {
    name: 'Javascript',
    description: 'Javascript',
  },
  {
    name: 'Java',
    description: 'Java',
  },
  {
    name: 'Ruby',
    description: 'Ruby',
  },
  {
    name: 'Golang',
    description: 'Golang',
  },
  {
    name: 'Linux',
    description: 'Linux',
  },
  {
    name: 'Windows',
    description: 'Windows',
  },
  {
    name: 'MacOS',
    description: 'MacOS',
  },
  {
    name: 'Git',
    description: 'Git',
  },
  {
    name: 'Webpack',
    description: 'Webpack',
  },
]

function initRoles() {
  query(`TRUNCATE TABLE roles`)
  roles.forEach(role => {
    query(`INSERT INTO roles (name, code) VALUES (${conn.escape(role.name)}, ${conn.escape(role.code)})`)
  })
}

function initSubjects() {
  query(`TRUNCATE TABLE subjects`)
  subjects.forEach(subject => {
    const datetime = new Date()
    query(`INSERT INTO subjects (name, description, created_at, updated_at) VALUES (${conn.escape(subject.name)}, ${conn.escape(subject.description)}, ${conn.escape(datetime)}, ${conn.escape(datetime)})`)
  })
}

initRoles()
initSubjects()
conn.end()