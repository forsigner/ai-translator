import gql from "gql-tag";

export const TOKENS = gql`
query tokens($orderBy: String, $skip: Int, $take: Int, $where: TokenWhereInput){
    tokens(orderBy: $orderBy, skip: $skip, take: $take, where: $where){
        createdAt
        description
        id
        type
        updatedAt
        user{
            avatar
            bio
            createdAt
            email
            emailValidatedAt
            githubId
            googleId
            id
            jobTitle
            login
            nickname
            phone
            updatedAt
            username
        }
        userId
        value
    }
}
`;
export const SEARCH_USERS = gql`
query searchUsers($q: String!){
    searchUsers(q: $q){
        avatar
        bio
        createdAt
        email
        emailValidatedAt
        githubId
        googleId
        id
        jobTitle
        login
        nickname
        phone
        plan{
            cancelAt
            currentPeriodEnd
            currentPeriodStart
            customerId
            id
            interval
            price
            priceId
            status
            subscriptionId
            type
            userId
        }
        updatedAt
        username
    }
}
`;
export const VISIT = gql`
query visit{
    visit{
        activeSessionId
        activeTeamId
    }
}
`;
export const CHAT_SETTINGS = gql`
query chatSettings{
    chatSettings{
        followUpMessageLength
        id
        maxToken
        model
        showTokenCount
    }
}
`;
export const MESSAGES = gql`
query messages($orderBy: String, $skip: Int, $take: Int, $where: MessageWhereInput){
    messages(orderBy: $orderBy, skip: $skip, take: $take, where: $where){
        botId
        content
        createdAt
        id
        private
        role
        streaming
        updatedAt
        userId
        userMessageId
        views
    }
}
`;
export const LOGIN_BY_GITHUB = gql`
mutation loginByGithub($code: String!){
    loginByGithub(code: $code){
        plan{
            cancelAt
            currentPeriodEnd
            currentPeriodStart
            customerId
            id
            interval
            price
            priceId
            status
            subscriptionId
            type
            userId
        }
        token
        user{
            avatar
            bio
            createdAt
            email
            emailValidatedAt
            githubId
            googleId
            id
            jobTitle
            login
            nickname
            phone
            updatedAt
            username
        }
        userId
        username
    }
}
`;
export const LOGIN_BY_GOOGLE = gql`
mutation loginByGoogle($code: String!){
    loginByGoogle(code: $code){
        plan{
            cancelAt
            currentPeriodEnd
            currentPeriodStart
            customerId
            id
            interval
            price
            priceId
            status
            subscriptionId
            type
            userId
        }
        token
        user{
            avatar
            bio
            createdAt
            email
            emailValidatedAt
            githubId
            googleId
            id
            jobTitle
            login
            nickname
            phone
            updatedAt
            username
        }
        userId
        username
    }
}
`;
export const LOGIN_BY_PERSONAL_TOKEN = gql`
mutation loginByPersonalToken($token: String!){
    loginByPersonalToken(token: $token){
        plan{
            cancelAt
            currentPeriodEnd
            currentPeriodStart
            customerId
            id
            interval
            price
            priceId
            status
            subscriptionId
            type
            userId
        }
        token
        user{
            avatar
            bio
            createdAt
            email
            emailValidatedAt
            githubId
            googleId
            id
            jobTitle
            login
            nickname
            phone
            updatedAt
            username
        }
        userId
        username
    }
}
`;
export const ADD_TOKEN = gql`
mutation addToken($input: AddTokenInput!){
    addToken(input: $input){
        createdAt
        description
        id
        type
        updatedAt
        user{
            avatar
            bio
            createdAt
            email
            emailValidatedAt
            githubId
            googleId
            id
            jobTitle
            login
            nickname
            phone
            updatedAt
            username
        }
        userId
        value
    }
}
`;
export const DELETE_TOKEN = gql`
mutation deleteToken($input: DeleteTokenInput!){
    deleteToken(input: $input)
}
`;
export const UPDATE_USER = gql`
mutation updateUser($input: UpdateUserInput!){
    updateUser(input: $input){
        avatar
        bio
        createdAt
        email
        emailValidatedAt
        githubId
        googleId
        id
        jobTitle
        login
        nickname
        phone
        plan{
            cancelAt
            currentPeriodEnd
            currentPeriodStart
            customerId
            id
            interval
            price
            priceId
            status
            subscriptionId
            type
            userId
        }
        updatedAt
        username
    }
}
`;
export const UPDATE_VISIT = gql`
mutation updateVisit($input: UpdateVisitInput!){
    updateVisit(input: $input)
}
`;
export const UPDATE_CHAT_SETTINGS = gql`
mutation updateChatSettings($input: UpdateChatSettingsInput!){
    updateChatSettings(input: $input)
}
`;
export const ADD_MESSAGE = gql`
mutation addMessage($input: AddMessageInput!){
    addMessage(input: $input){
        botId
        content
        createdAt
        id
        private
        role
        streaming
        updatedAt
        userId
        userMessageId
        views
    }
}
`;
export const UPDATE_MESSAGE = gql`
mutation updateMessage($input: UpdateMessageInput!){
    updateMessage(input: $input){
        botId
        content
        createdAt
        id
        private
        role
        streaming
        updatedAt
        userId
        userMessageId
        views
    }
}
`;
export const REMOVE_MESSAGE_PAIR = gql`
mutation removeMessagePair($input: RemoveMessagePairInput!){
    removeMessagePair(input: $input)
}
`;
export const INIT_STRIPE_CUSTOMER_ID = gql`
mutation initStripeCustomerId($input: InitStripeCustomerIdInput!){
    initStripeCustomerId(input: $input)
}
`;
export const MODIFY_PLAN = gql`
mutation modifyPlan($input: ModifyPlanInput!){
    modifyPlan(input: $input)
}
`;
