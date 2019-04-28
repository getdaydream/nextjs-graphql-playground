# apollo-client

## 直接读写缓存

使用`ApolloClient`类的方法：`readQuery`、`writeQuery`、`readFragment`、`writeFragment`
`client.writeQuery`会广播更改并更新视图，而使用`cache.writeQuery`视图不一定会马上变更