const { query, conn } = require('./index')
const pw = require('../util/password')
const escape = conn.escape.bind(conn)

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

const users = [
  {
    name: 'admin',
    password:pw.encrypt('password'),
    email:'admin@daydayup.com',
    role_code:'0',
  }
]

async function truncate(tableName) {
  await query(`SET FOREIGN_KEY_CHECKS = 0`)
  await query(`TRUNCATE ${tableName}`)
  await query(`SET FOREIGN_KEY_CHECKS = 1`)
}

async function initUsers() {
  await truncate('users')
  return Promise.all(
    users.map(({name, password, email, role_code}) => {
      const datetime = new Date()
      return query(`INSERT INTO users (name, password, email, role_code, created_at, updated_at) VALUES 
        (${escape(name)}, ${escape(password)}, ${escape(email)}, ${escape(role_code)}, ${escape(datetime)}, ${escape(datetime)})`)
    })
  )
}

async function initRoles() {
  await truncate('roles')
  return Promise.all(
    roles.map(role => {
      return query(`INSERT INTO roles (name, code) VALUES 
        (${escape(role.name)}, ${escape(role.code)})`)
    })
  )
}

async function initSubjects() {
  await truncate('subjects')
  const {results} = await query(`SELECT id FROM users WHERE name = 'admin'`)
  const creator_id = results[0].id
  return Promise.all(
    subjects.map(subject => {
      const datetime = new Date()
      return query(`INSERT INTO subjects (name, description, creator_id, created_at, updated_at) VALUES 
        (${escape(subject.name)}, ${escape(subject.description)}, ${escape(creator_id)}, ${escape(datetime)}, ${escape(datetime)})`)
    })
  )
}

async function init() {
  await initRoles()
  await initUsers()
  await initSubjects()
  conn.end()
}

init()