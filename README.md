## Step 1.
Create a cypress.env.json at the root folder of the project.
Copy the content I gave HR team.

## Step 2.
Install the dependencies

```bash
npm install
```

## Step 3.

Run the test

```bash
npm run test
```

Results

```txt
(Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  login.spec.ts                            00:47        7        7        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  reputation.spec.ts                       01:02        3        3        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        01:49       10       10        -        -        -  

```

-----

There are 10 tests in the project
- Login using email for both success and failed cases
- Go to reputation page using email and password and check All teams and Favorite Teams sections as well as unmarking favorite team.