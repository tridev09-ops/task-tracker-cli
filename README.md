## task-tracker-cli
Task tracker is a project used to track and manage your tasks. 

The application run from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file. The user should be able to:

* Add, Update, and Delete tasks

* Mark a task as in progress or done

* List all tasks

* List all tasks that are done

* List all tasks that are not done

* List all tasks that are in progress

The list of commands and their usage is given below:

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
https://github.com/tridev09-ops/task-tracker-cli/
