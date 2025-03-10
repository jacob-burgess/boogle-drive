import { database } from "./database";
// import { allSecrets } from "./secrets";

new sst.aws.OpenControl("OpenControl", {
  server: {
    handler: "packages/ ction/opencontrol/server.handler",
    link: [
      database,
      // ...allSecrets
    ],
    transform: {
      role: (args) => {
        args.managedPolicyArns = $output(args.managedPolicyArns).apply((v) => [
          ...(v ?? []),
          "arn:aws:iam::aws:policy/ReadOnlyAccess",
        ]);
      },
    },
  },
});
