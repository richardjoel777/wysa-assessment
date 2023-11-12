# Intuition

  

The Intuition is to find whether the given binary tree is valid or not. To validate, I need to check whether the left subtree of each node contains only nodes with values less than the node's value, and the right subtree only contains nodes with values greater than the node's value.

  

# Approach

  

My approach involves recursively checking each node in the binary tree, ensuring that its value falls within a valid range using the validate function. It takes a node, along with the minimum and maximum values allowed for that node based on its position in the tree. It returns false if the condition fails. Otherwise it recursively calls the method for both it's left and right subtree and returns the logical AND operation of both recursively called function's returned values.

  

# Complexity

- Time complexity:

Time complexity: *O(n)*, where n is the number of nodes in the binary tree.

  

- Space complexity:

Space complexity: *O(h)*, where h is the height of the binary tree. The space is used by recursive call stacks.

  

# Code

```

/**

* Definition for a binary tree node.

* class TreeNode {

* val: number

* left: TreeNode | null

* right: TreeNode | null

* constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {

* this.val = (val===undefined ? 0 : val)

* this.left = (left===undefined ? null : left)

* this.right = (right===undefined ? null : right)

* }

* }

*/

  

function validate(node: TreeNode, min: number, max: number): boolean {

if (node == null)

return true;

if (node.val <= min || node.val >= max)

return false;

return (validate(node.left, min, node.val) && validate(node.right, node.val, max));

}

  

function isValidBST(root: TreeNode | null): boolean {

return validate(root, -Infinity, Infinity);

};

```
