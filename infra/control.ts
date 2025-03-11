import { database } from "./database";
// import { allSecrets } from "./secrets";

const OC = new sst.aws.OpenControl("OpenControl", {
  server: {
    handler: "packages/control/src/server.handler",
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

export const outputs = {
  opencontrol: OC.url,
};
