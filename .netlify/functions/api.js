// This API receives the target path and file content, then connect to
// github and update it there.
const { Octokit } = require("@octokit/rest");

// Commit info
const REPO_NAME = "TemplateOnlineExperiment"
const REPO_OWNER = "hungpham2511" // update this to use "RealityBending"
const REPO_BRANCH = "store-data"
const COMMITTER_NAME = "Hung"
const COMMITTER_EMAIL = "hungpham2511@gmail.com"
const AUTHOR_NAME = "Hung"
const AUTHOR_EMAIL = "hungpham2511@gmail.com"

exports.handler = async (event, context) => {
    // content should be a dictionary with two attributes: 'path' and 'data'
    const content = JSON.parse(event.body);
    console.log(content)

    // authenticating with Octokit
    const octokit = new Octokit({
        auth: process.env.GH_OAUTH
    })

    // send request to update file content
    const response = await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        content: Buffer.from(content.data).toString('base64'),
        message: `Saving ${content.path}`,
        path: content.path, 
        branch: REPO_BRANCH,
        committer: {
            name: COMMITTER_NAME,
            email: COMMITTER_EMAIL,
        },
        author: {
            name: AUTHOR_NAME,
            email: AUTHOR_EMAIL,
        }
    })

    if (response.status == 200 || response.status == 201){
        return {
            statusCode: 200,
            body: JSON.stringify({
                result: "File updated."
            }),
        }       
    }
    return {
        statusCode: response.status,
        body: JSON.stringify({
                result: "Unable to update file."
        })
    }

}
