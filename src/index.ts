// import { Corinth } from "./corinth";
// // import { Queue } from "./queue";

// const corinth = new Corinth("http://localhost:44444");

// // interface ITestItem {
// //   name: string;
// // }

// (async () => {
//   const id = Date.now().toString();
//   console.log(await corinth.queueExists(id));
//   await corinth.createQueue(id);
//   console.log(await corinth.queueExists(id));
//   // await corinth.ensureQueue(id);
//   // await corinth.ensureQueue(id);
//   // await corinth.ensureQueue(id);
//   // await corinth.ensureQueue(id);
//   // await corinth.ensureQueue(id);
//   //await corinth.createQueue(id);
//   // console.log(await queue.stat());
//   // await queue.purge();
//   // await queue.delete();
//   // try {
//   //   await queue.stat();
//   // } catch (error) {
//   //   console.log(error.res.data);
//   // }
//   // console.log(await queue.stat());
//   // try {
//   //   await queue.enqueue([
//   //     {
//   //       item: {
//   //         name: "Test 1",
//   //       },
//   //       deduplication: null,
//   //     },
//   //     {
//   //       item: {
//   //         name: "Test 2",
//   //       },
//   //       deduplication: null,
//   //     },
//   //   ]);
//   // } catch (error) {
//   //   console.log(error.res.data);
//   // }
//   // console.log(await queue.stat());
//   // const result = await queue.dequeue();
//   // console.log(result[0].message);
//   // console.log(await queue.stat());
//   // await result[0].ack();
//   // console.log(await queue.stat());
// })();

export * from "./corinth";
export * from "./error";
export * from "./queue";
