import { GET_PROJECTASKS, PROJECTASKS_STATUS } from '../actionTypes';
import { database } from '../firebase';

export function getProjectasks() {
    return dispatch => {
        // as soon as this function fires show loading to true
        dispatch({
            type: PROJECTASKS_STATUS,
            payload: true
        });
        database.on(
            'value',
            snapshot => {
                dispatch({
                    type: GET_PROJECTASKS,
                    payload: snapshot.val()
                });
                // once projectasks are received show loading to false
                dispatch({
                    type: PROJECTASKS_STATUS,
                    payload: false
                });
                // wait until something changes and try again
            },
            () => {
                dispatch({
                    type: PROJECTASKS_STATUS,
                    payload: -1
                });
            }
        );
    };
}

export function saveNote(note) {
    return disptch => database.push(note);
}

export function editNote(id, note) {
    return dispatch => database.child(id).update(note);
}

export function deleteNote(id) {
    return dispatch => database.child(id).remove();
}

export function saveComment(noteId, comment) {
    return dispatch => {
        database
            .child(noteId)
            .child('comments')
            .push(comment);
    };
}
