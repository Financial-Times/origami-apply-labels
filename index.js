var core = require("@actions/core");
const fs = require("fs");
const { context, GitHub } = require("@actions/github");

void async function () {
	try {
		// Get and parse origami.json
		let projectManifest;
		try {
			projectManifest = JSON.parse(fs.readFileSync("./origami.json", "utf-8"));
		} catch(e) {
			throw new Error(`Could not parse "origami.json": ${e.message}`);
		}
		// Exit without error if there is no Origami type defined.
		// The "component" type replaces the "module" type, the two are
		// synonymous, so use a "component" label over a "module" label.
		// https://github.com/Financial-Times/origami-website/pull/202
		let origamiType = projectManifest.origamiType;
		origamiType = origamiType === 'module' ? 'component' : origamiType;
		if (!origamiType) {
			core.warning(
				`"${context.repo.repo}" has no "origamiType" defined in ` +
				'"origami.json", so there is no label to add.');
			process.exit(0);
		}
		// Add an origami type label
		const token = core.getInput("github-token", { required: true });
		const github = new GitHub(token);
		if (origamiType) {
			await github.issues.addLabels({
				owner: context.repo.owner,
				repo: context.repo.repo,
				issue_number: context.issue.number,
				labels: [origamiType],
			});
		}
		process.exit(0);
	} catch (error) {
		core.setFailed(`Could not add an Origami type label.\n${error.message}`);
		process.exit(1);
	}
}();
