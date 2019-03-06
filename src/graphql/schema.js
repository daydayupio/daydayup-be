import { gql } from "apollo-server-express"

export const schema = gql`
    scalar Date

    type Query {
        users: [User]
        profile: User
        subjects: [Subject]
        topics(subjectName: String): [Topic]
        topic(id: Int): Topic
    }

    type User {
        "用户名"
        name: String

        "用户邮箱"
        email: String
    }

    type Subject {
        "主题名称"
        name: String

        "主题描述"
        description: String

        "创建者"
        creator: User
    }

    type Topic {
        id: Int

        "话题名称"
        title: String

        "话题描述"
        description: String

        "浏览次数"
        views: Int

        "投票数"
        votes: Int

        "关注数"
        stars: Int

        "观点数"
        opinions: Int

        "创建时间"
        createdAt: Date

        "更新时间"
        updatedAt: Date

        "创建者"
        creator: User

        "所属主题"
        subject: Subject
    }

    type Mutation {
        "注册"
        register(name: String!, email: String!, password: String!): String

        "登录"
        login(name: String!, password: String!): String

        "更新用户信息"
        updateProfile(email: String, password: String): String

        "创建主题"
        createSubject(name: String, description: String): String

        "创建话题"
        createTopic(
            title: String
            description: String
            subjectName: String
        ): String
    }
`
