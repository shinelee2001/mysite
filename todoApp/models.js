class Todo {
    // 매개변수로 할 일 내용과 완료 여부를 정의
    constructor(contents, done) {
        this.contents = contents;
        this.done = done;
    }

    // 완료 여부를 토글하는 메소드
    // 완료된 상태에서 호출하면 완료되지 않는 상태가 된다.
    toggle() {
        this.done = !this.done;
    }
}

class TodoManager {
    // 매개변수로 초기 할 일들을 배열로 전달 받아 _todos에 저장
    constructor(todos = []) {
        this._todos = [];
        todos.forEach(todo => {
            this.addTodo(todo.contents, todo.done);
        });
    }

    // 할 일 매개변수(완료 여부는 기본으로 false)를 받아 Todo 객체로 변환
    // 변환된 객체는 todos 배열에 삽입되고, Todo 객체는 반환
    addTodo(contents, done = false) {
        const newTodo = new Todo(contents, done);
        this._todos.push(newTodo);
        return newTodo;
    }

    // 할 일 객체들의 집합(배열형) 반환
    getList() {
        return this._todos;
    }

    // 불러오기만 가능한 함수
    // 아직 남은 할 일 개수 반환
    get leftTodoCount() {
        return this._todos.reduce((count, todo) => {
            if (todo.done === false) {
                return ++count;
            } else {
                return count;
            }
        }, 0);
    }
}