import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SyntaxHighlighter from "../components/SyntaxHighlighter";

export default function Home() {
  const [pullRequest, setPullRequest] = useState([]);
  const [comment, setComment] = useState([]);
  const [data, setSource] = useState([]);

  const getCommments = async (url) => {
    var params = new URLSearchParams();
    params.append("url", url);
    const response = await axios.post("/api/getComments", params);
    setComment(response.data.comments.values);
  };

  const getSource = async (url) => {
    var params = new URLSearchParams();
    params.append("url", `${url}` + "/diff");
    const response = await axios.post("/api/getSource", params);
    setSource(response.data.source);
    console.log(response);
  };

  async function getPullRequest() {
    var params = new URLSearchParams();
    const response = await axios.post("/api/getPullRequest", params);
    setPullRequest(response.data.pullrequests.values);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <Button onClick={getPullRequest}>TEST BUTTON</Button>
        </div>
      </main>
      <main className={styles.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell>作成者</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>コメント</TableCell>
                <TableCell>タスク</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pullRequest.map((row) => (
                <TableRow key={row.id}>
                  <TableCell onClick={() => getSource(row.links.self.href)}>
                    {row.title}
                  </TableCell>
                  <TableCell>{row.author.display_name}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.comment_count}件</TableCell>
                  <TableCell>{row.task_count}件</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <main className={styles.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>コメント</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comment.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell
                    onClick={() => getSource(row.pullrequest.links.self.href)}
                  >
                    {row.content.raw}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <main>
        <SyntaxHighlighter language="diff">{data}</SyntaxHighlighter>
      </main>
    </div>
  );
}
