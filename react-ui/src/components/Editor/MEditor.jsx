import Editor from '@monaco-editor/react'
import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuesForm from '../DynamicForm/QuesForm';
import "./editor.css";
import { GrLinkPrevious } from 'react-icons/gr';


const myButton = function button() {
  return (
    <>
      <Button>submit</Button>
    </>
  )
}

const MEditor = () => {
  const navigate = useNavigate();
  const data = useLocation();

  // console.log("------------------>", data);
  const [code, setCode] = useState("")

  useEffect(() => {
    getCode();
  }, [code])

  function getCode() {
    fetch(`http://localhost:8090/api/code?exercise=${data.state.exid}`)
      .then((result => {
        result.json().then((res) => {
          console.log("result", res);
          setCode(res)
        })
      }))
  }

  // console.warn(data.state);

  const options = {
    readOnly: true,
    domReadOnly: true,
    minimap: { enabled: false },
    wordWrap: 'on',
    fontSize: '14rem',
    mouseWheelZoom: true,
    fontFamily: 'open sans'

  };

  return (
    <>
      <Box paddingLeft={5} sx={{
        // backgroundColor: 'red',
        borderBottom: '1px solid gray',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* <Button onClick={() => navigate(-1)}
          sx={{
            // flex: 1,
            textTransform: 'capitalize',
            fontFamily: 'Source code pro',
            fontWeight: '500',
            fontSize: '15px',
            color: '#848482',
            "&:hover": {
              backgroundColor: 'white',
            },
          }}>
          <GrLinkPrevious style={{
            marginRight: '10px',
            color: 'red'
          }} /> Back to Exercise
        </Button> */}

      </Box>
      <Box sx={{
        margin: '0px 3rem',
      }}>

        <Box sx={{
          margin: ' .5rem 0 ',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        }}>
          <Button onClick={() => navigate(-1)}
            sx={{
              // flex: 1,
              // width: '20px',
              // height: '20px',
              textTransform: 'capitalize',
              fontFamily: 'Source code pro',
              fontWeight: '500',
              fontSize: '20px',
              color: '#848482',
              // backgroundColor: 'blue',
              justifyContent: 'left',
              padding: '0px',
              "&:hover": {
                backgroundColor: 'white',
              },
            }}>
            <GrLinkPrevious style={{
              marginRight: '10px',
              color: 'red'
            }} />
          </Button>

          <Typography sx={{
            flex: 1,
            fontFamily: 'Poppins',
            fontWeight: '600',
            fontSize: '1.15rem',
            alignItems: 'left',
            justifySelf: 'start',
            color: '#6699cc',
          }}>
            <span style={{
              fontFamily: 'poppins',
              color: '#a7a6ba',
            }}>{`${data.state.language} /`}</span> {`${data.state.subcategoryid}`}
          </Typography>
          <Button sx={{
            textTransform: ' capitalize',
            fontFamily: 'poppins',
            fontWeight: '600',
            fontSize: '1rem',
            color: 'white',
            padding: '4px 7px',
            borderRadius: '5px',
            backgroundColor: '#8a2be2',
            "&:hover": {
              backgroundColor: '#8a2be2',
            },
          }}>
            Instructions
          </Button>
        </Box>

        {/* code viewer */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            border: '1px solid gray',
            borderRadius: '10px 10px 0px 0px',
            width: '51%',
            height: '77vh',
            marginRight: '.5em',
          }}>
            <Box>
              <Typography sx={{
                padding: '.5rem 1rem',
                borderBottom: '2px solid #C0C0C0',
                fontFamily: 'Poppins',
                fontWeight: '600',
                textAlign: 'left',
              }}>
                Code Viewer
              </Typography>
            </Box>
            <Editor
              height="70vh"
              width="100%"
              language="c"
              theme='vs-dark'
              value={code}
              options={options}
            />
          </Box>
          <Box>
            <Box sx={{
              border: '1px solid gray',
              borderRadius: '10px 10px 0px 0px',
              width: '100%',
            }}>
              <Typography sx={{
                padding: '.5rem 1rem',
                borderBottom: '2px solid #C0C0C0',
                fontFamily: 'Poppins',
                fontWeight: '600',
              }}>
                Answer the following
              </Typography>
              <Box sx={{
                // height: '60vh',
                // overflowY: 'auto',
                // width: '600px',
              }}>
                <QuesForm data={data} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export {
  MEditor,
};