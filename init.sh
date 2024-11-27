SESH="samarpit-workflow"

tmux has-session -t $SESH 2>/dev/null

if [ $? != 0 ]; then

 tmux new-session -d -s $SESH -n hono-client-build
 tmux send-keys "cd './apps/backend/' && code . && bun build:watch" C-m

 tmux new-window -n backend
 tmux send-keys "cd './apps/backend/' && code . && bun dev" C-m

 tmux new-window -n mobile-app
 tmux send-keys "cd './apps/mobile-app/' && code . && bun start" C-m

 HIGHLIGHT_COLOR ="cyan"
 BG_COLOR="black"
 ACTIVE_COLOR="red"

 tmux set-option -t samarpit-workflow status-style fg=white,bg=$BG_COLOR

fi

tmux attach-session -t $SESH
