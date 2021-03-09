//upload data
//authenticate with octokit
const { Octokit } = require("@octokit/rest");

// Commit info
const REPO_NAME = "TemplateOnlineExperiment"
const REPO_OWNER = "hungpham2511" // update this to use "RealityBending"

exports.handler = async (event, context) => {
    // content should be a dictionary with two attributes: 'path' and 'data'
    const content = JSON.parse(event.body);
    console.log(content)
    
    const octokit = new Octokit({
        auth: process.env.GH_OAUTH, // authenticating Octokit
    })
    const response = await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        content: Buffer.from(content.data).toString('base64'),
        message: `Saving ${content.path}`,
        path: content.path, 
        committer: {
            name: "Hung",
            email: "hungpham2511@gmail.com",
        },
        author: {
            name: "Hung",
            email: "hungpham2511@gmail.com",
        }
    })
    console.log(response)

    return {
        statusCode: 200,
        body: JSON.stringify({
            result: "ok"
        }),
    }
}
