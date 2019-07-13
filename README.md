<p align="center">
  <a href="https://github.com/afeiship/finxos-cli">
    <img src="http://ww2.sinaimg.cn/large/006tNc79gy1g4y5u28pngj319c09ogns.jpg">
  </a>
</p>


# finxos-cli
> Cli tools for finxos.


## installation
```shell
git clone https://github.com/afeiship/finxos-cli.git
cd finxos-cli
npm install
npm link
```

## usage
```shell
tss-cli upload --path=tucloud/assets/tss-cli-test2
```


## cmds
| api    | type    | description                                                   |
| ------ | ------- | ------------------------------------------------------------- |
| upload | path(p) | Set default remote path.(default:tucloud/assets/tss-cli-test) |
|        | cwd(c)  | Set default local path.(default: current path)                |
