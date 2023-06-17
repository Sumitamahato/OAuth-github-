const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));





const client_id = "284311611283da0350f9"
const client_secret = "9a25a8921806aefe297879788454e5f97f5cafea"
// callback URL=http://localhost:8080/auth/github

app.get("/", (req, res) => {
    res.send("base end point")
})



app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});



app.get("/auth/github", async (req, res) => {
    const { code } = req.query
    console.log(code)
    const accessToken = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            client_id: client_id,
            client_secret: client_secret,
            code
        })
    }).then((res) => res.json())
    console.log(accessToken)
    const user = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken.access_token}`
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

    console.log(user)

    const useremailis = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${accessToken.access_token}`
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

    console.log(useremailis)

    res.send("Signin with Github successfull")
})




