import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";
import { useRouter } from "next/router";
import en from "../locales/en";
import ja from "../locales/ja";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  let { locale } = useRouter();
  let t = locale === "en" ? en : ja;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [pullRequest, setPullRequest] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState([]);

  const getComments = async (id) => {
    var params = new URLSearchParams();
    params.append("id", id);
    const response = await axios.post("/api/getComments", params);
    setComment(response.data.comments.values);
  };

  async function getPullRequest() {
    var params = new URLSearchParams();
    const response = await axios.post("/api/getPullRequest", params);
    setPullRequest(response.data.pullRequests.values);
    setLoading(false);
  }

  useEffect(() => {
    getPullRequest();
  }, []);

  if (loading) {
    return (
      <main className={styles.loading}>
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#2196f3"
          ariaLabel="three-dots-loading"
        />
      </main>
    );
  } else {
    return (
      <div className={styles.container}>
        <main className={styles.table}>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 650, maxWidth: 1500, alignSelf: "center" }}
          >
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>{t.TITLE}</StyledTableCell>
                  <StyledTableCell>{t.AUTHOR}</StyledTableCell>
                  <StyledTableCell>{t.STATUS}</StyledTableCell>
                  <StyledTableCell>{t.COMMENT}</StyledTableCell>
                  <StyledTableCell>{t.TASK}</StyledTableCell>
                  <StyledTableCell>{t.CREATE}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {pullRequest.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      <Link
                        href={row.links.html.href}
                        underline="hover"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.title}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{row.author.display_name}</StyledTableCell>
                    <StyledTableCell>{row.state}</StyledTableCell>
                    <StyledTableCell onClick={() => getComments(row.id)}>
                      <Link underline="hover">{row.comment_count}
                        {t.COUNT}</Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.task_count}
                      {t.COUNT}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.created_on}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
        <main className={styles.table}>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 650, maxWidth: 1500, alignSelf: "center" }}
          >
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell sx={{ minWidth: 100 }}>{t.USER}</StyledTableCell>
                  <StyledTableCell>{t.COMMENT}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {comment.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.user.display_name}</StyledTableCell>
                    <StyledTableCell><Link
                      href={row.links.html.href}
                      underline="hover"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.content.raw}
                    </Link></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </div>
    );
  }
}
