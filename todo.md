__Adding a new task__
```
task-cli add "Buy groceries"  
```
Output: Task added successfully (ID: 1)  

___Updating and deleting tasks___
```
task-cli update 1 "Buy groceries and cook dinner"  
task-cli delete 1  
```

___Marking a task as in progress or done___
```
task-cli mark-in-progress 1  
task-cli mark-done 1  
```

___Listing all tasks___
```
task-cli list  
```

___Listing tasks by status___
```
task-cli list done  
task-cli list todo  
task-cli list mark-in-progress  
```