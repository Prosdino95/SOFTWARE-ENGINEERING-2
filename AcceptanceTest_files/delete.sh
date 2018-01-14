 #!/bin/bash
        for i in `seq 1 9999`; do
            curl -i -H "Authorization: Bearer 50ab7dc9-19d7-49b5-ac5f-08e210129d76" -H "Content-Type: application/json" -X DELETE  http://192.168.1.73:8080/web/v1/user/appointment/1$i
        done