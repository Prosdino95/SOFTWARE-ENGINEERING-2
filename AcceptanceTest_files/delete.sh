 #!/bin/bash
        for i in `seq 1 9999`; do
            curl -i -H "Authorization: Bearer 31138dba-314a-4c20-b129-5a3811afd4cf" -H "Content-Type: application/json" -X DELETE  http://localhost:8080/web/v1/user/appointment/$i
        done