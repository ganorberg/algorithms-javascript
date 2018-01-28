/*
 * Implement the "paint fill" function that one might see on many image editing
 * programs. That is, given a screen (represented by a two-dimensional array of
 * colors), a point, and a new color, fill in the surrounding area until the 
 * color changes from the original color.
 * 
 * STRATEGY:
 * Convert 2D array into graph, where each point is a vertex and all points
 * share an edge with surrounding points. Use adjacency matrix DFS or BFS
 * to overwrite points with new color until next point does not share same color
 * with origin point.
 */