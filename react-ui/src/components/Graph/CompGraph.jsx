import { Box } from "@mui/material";
import Graph from "react-vis-network-graph";

const CompGraph = () => {
  const graph = {
    nodes: [
      { id: 1, label: "Node 2", title: "node 2 tootip text", level: 1 },
      { id: 2, label: "Node 1", title: "node 1 tootip text", level: 2 },
      { id: 3, label: "Node 3", title: "node 3 tootip text", level: 2 },
      { id: 4, label: "Node 4", title: "node 4 tootip text", level: 2 },
      { id: 5, label: "Node 4", title: "node 4 tootip text", level: 2 },

    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
    ]
  };

  const options = {
    layout: {
      hierarchical: {
        enabled: true
      }
    },
    nodes: {
      shape: "box",
      margin: {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
      },
      shapeProperties: {
        borderDashes: false, // only for borders
        borderRadius: 5 // only for box shape
      },
    },
    edges: {
      color: "#000000",
      dashes: true,
      smooth: {
        type: "cubicBezier",
        forceDirection: "none",
        roundness: 0.45
      },
      arrows: {
        to: {
          type: "arrow"
        },
      },
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      multiselect: true,
      dragView: false,
      zoomView: false
    },
  };

  return (
    <>
      <Box sx={{
        width: "100%",
        height: '100vh',
        // backgroundColor: 'red',
      }}>
        <Graph
          graph={graph}
          options={options}
        />
      </Box>
    </>
  );
}

export default CompGraph;