#!/bin/bash

(while true; do
  hugo server --disableFastRender
done) &
