Provides a simple UI for Bitbucket Cloud.  

## Attention!!!
**Currently, it is in the test creation phase. Significant changes may be made in the future.**

## Getting Started

### Clone the file locally and edit the configuration file

First, please Clone this source code.

```bash
git clone Bitbucket-Cloud-simple-UI
```

Next, rewrite the following settings in the .env file

| items         | details                                      | 
| ------------- | -------------------------------------------- | 
| CLIENT_ID     | The method of acquisition is described below | 
| CLIENT_SECRET | The method of acquisition is described below | 
| WORKSPACE     | Target workspace name                        | 
| REPOSITORY    | Target repository name                       | 

### How to get CLIENT_ID and CLIENT_SECRET

Go to Bitbucket's OAuth consumer page. (url ex: `https://bitbucket.org/<workspace name>/workspace/settings/api`)

Click on "Add consumer".

![image](https://user-images.githubusercontent.com/40861943/201917437-fffd6832-5476-46e0-a580-1ee195fdc632.png)

The following must be set.

- Name -> Any
- Callback URL -> https://bitbucket.org
- This is a private consumer -> Checked

The permissions shall be set as follows.
- Account -> Email Read
- Repositories -> Read Write
- Pull requests -> Read Write

![image](https://user-images.githubusercontent.com/40861943/201917657-59def70a-81e5-4043-b021-03c7617f4877.png)

![image](https://user-images.githubusercontent.com/40861943/201918045-8aea0c3d-e0b6-4e90-858d-e27fed9866ed.png)

Click Save.

The Key listed here is CLIENT_ID and Secret is CLIENT_SECRET. Enter these in the .env file.

![image](https://user-images.githubusercontent.com/40861943/201918925-421578fc-d898-44e3-944a-7f383c04d1b8.png)

### Deploy
```bash
docker-compose up -d
```

## Options
### If you have a proxy setting
Add a `PROXY` entry to the .env file.

```bash
#in .env file
PROXY=http://<username>:<password>@<url>:<port>
```

## License
- [MIT](https://github.com/szktmyk38f/Bitbucket-Cloud-simple-UI/blob/master/LICENSE)

## Author
- [szktmyk38f](https://github.com/szktmyk38f)
