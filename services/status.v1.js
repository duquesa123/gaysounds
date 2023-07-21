const getRepoInfo = require('git-repo-info');

const skusClient = require("../lib/skus-client");
const locs = require("../lib/locs");

const bootTime = Date.now();
const repoInfo = getRepoInfo();

module.exports = (app, public, private, logger) => {

    private.get("/envs", (req, res, next) => {
        return res.send({
            envs: global.config.ENVS
        })
    });

    public.get("/info", (req, res, next) => {
        return res.send({
            bootTime,
            env: global.ENV,
            version: global.project.version,
            branch: repoInfo.branch,
            deployment: repoInfo.sha,
            tag: repoInfo.lastTag
        })
    });

    public.get("/locs", async (req, res, next) => {
        return res.send({
            locs: global.locs
        });
    });

    public.get("/languages", async (req, res, next) => {
        return res.send({
            languages: global.languages
        });
    });

    public.get("/ping", skusClient, (req, res, next) => {
        return res.sendStatus(200);
    });

};